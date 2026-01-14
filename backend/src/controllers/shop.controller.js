const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.searchParts = async (req, res) => {
  try {
    const { q } = req.query;

    const parts = await prisma.part.findMany({
      where: {
        OR: [
          { name: { contains: q, mode: 'insensitive' } },
          { brand: { contains: q, mode: 'insensitive' } },
          { category: { contains: q, mode: 'insensitive' } }
        ]
      },
      take: 20
    });

    res.json({ parts });
  } catch (error) {
    console.error('Search parts error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getPartDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const part = await prisma.part.findUnique({ where: { id } });

    if (!part) {
      return res.status(404).json({ message: 'Part not found' });
    }

    res.json({ part });
  } catch (error) {
    console.error('Get part details error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.findNearbyMechanics = async (req, res) => {
  try {
    const { lat, lng } = req.query;

    // In production, calculate distance and filter by radius
    const mechanics = await prisma.mechanic.findMany({
      take: 10,
      orderBy: { rating: 'desc' }
    });

    // Add mock distance calculation
    const mechanicsWithDistance = mechanics.map(m => ({
      ...m,
      distance: (Math.random() * 10).toFixed(1)
    }));

    res.json({ mechanics: mechanicsWithDistance });
  } catch (error) {
    console.error('Find mechanics error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getMechanicProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const mechanic = await prisma.mechanic.findUnique({
      where: { id }
    });

    if (!mechanic) {
      return res.status(404).json({ message: 'Mechanic not found' });
    }

    res.json({ mechanic });
  } catch (error) {
    console.error('Get mechanic profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.bookAppointment = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { mechanicId, vehicleInfo, service, date, notes } = req.body;

    const appointment = await prisma.appointment.create({
      data: {
        userId,
        mechanicId,
        vehicleInfo,
        service,
        date: new Date(date),
        notes
      }
    });

    res.status(201).json({ message: 'Appointment booked', appointment });
  } catch (error) {
    console.error('Book appointment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getUserAppointments = async (req, res) => {
  try {
    const userId = req.user.userId;

    const appointments = await prisma.appointment.findMany({
      where: { userId },
      include: { mechanic: true },
      orderBy: { date: 'desc' }
    });

    res.json({ appointments });
  } catch (error) {
    console.error('Get appointments error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { items, shippingAddress } = req.body;

    // Calculate total
    let total = 0;
    for (const item of items) {
      const part = await prisma.part.findUnique({ where: { id: item.partId } });
      total += part.price * item.quantity;
    }

    const order = await prisma.order.create({
      data: {
        userId,
        total,
        shippingAddress,
        items: {
          create: items.map(item => ({
            partId: item.partId,
            quantity: item.quantity,
            price: item.price
          }))
        }
      },
      include: { items: true }
    });

    res.status(201).json({ message: 'Order created', order });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getOrderHistory = async (req, res) => {
  try {
    const userId = req.user.userId;

    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        items: { include: { part: true } }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ orders });
  } catch (error) {
    console.error('Get order history error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
