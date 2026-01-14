const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.addVehicle = async (req, res) => {
  try {
    const { vin, make, model, year, mileage, licensePlate } = req.body;
    const userId = req.user.userId;

    const vehicle = await prisma.vehicle.create({
      data: {
        userId,
        vin,
        make,
        model,
        year: parseInt(year),
        mileage: mileage ? parseInt(mileage) : null,
        licensePlate
      }
    });

    res.status(201).json({ message: 'Vehicle added successfully', vehicle });
  } catch (error) {
    console.error('Add vehicle error:', error);
    if (error.code === 'P2002') {
      return res.status(400).json({ message: 'VIN already exists' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getUserVehicles = async (req, res) => {
  try {
    const userId = req.user.userId;

    const vehicles = await prisma.vehicle.findMany({
      where: { userId },
      include: {
        diagnostics: {
          orderBy: { scanDate: 'desc' },
          take: 1
        },
        maintenanceLogs: {
          orderBy: { serviceDate: 'desc' },
          take: 1
        }
      }
    });

    res.json({ vehicles });
  } catch (error) {
    console.error('Get vehicles error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getVehicleDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const vehicle = await prisma.vehicle.findFirst({
      where: { id, userId },
      include: {
        diagnostics: { orderBy: { scanDate: 'desc' } },
        maintenanceLogs: { orderBy: { serviceDate: 'desc' } }
      }
    });

    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    res.json({ vehicle });
  } catch (error) {
    console.error('Get vehicle details error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    const updateData = req.body;

    const vehicle = await prisma.vehicle.updateMany({
      where: { id, userId },
      data: updateData
    });

    if (vehicle.count === 0) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    res.json({ message: 'Vehicle updated successfully' });
  } catch (error) {
    console.error('Update vehicle error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    await prisma.vehicle.deleteMany({
      where: { id, userId }
    });

    res.json({ message: 'Vehicle deleted successfully' });
  } catch (error) {
    console.error('Delete vehicle error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.scanVIN = async (req, res) => {
  try {
    const { image } = req.body;

    // In production, use OCR/AI to extract VIN from image
    // For now, return mock data
    const mockVIN = 'JM1BK32F781' + Math.floor(Math.random() * 100000);

    res.json({
      vin: mockVIN,
      message: 'VIN extracted successfully'
    });
  } catch (error) {
    console.error('VIN scan error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getMaintenanceSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const vehicle = await prisma.vehicle.findFirst({
      where: { id, userId }
    });

    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    // Generate recommended maintenance schedule based on mileage
    const schedule = [
      { type: 'Oil Change', dueAt: (vehicle.mileage || 0) + 3000, priority: 'high' },
      { type: 'Tire Rotation', dueAt: (vehicle.mileage || 0) + 5000, priority: 'medium' },
      { type: 'Brake Inspection', dueAt: (vehicle.mileage || 0) + 10000, priority: 'medium' },
      { type: 'Air Filter', dueAt: (vehicle.mileage || 0) + 15000, priority: 'low' },
    ];

    res.json({ schedule });
  } catch (error) {
    console.error('Get maintenance schedule error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.addMaintenanceLog = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, description, cost, mileage, serviceDate, nextDue } = req.body;

    const log = await prisma.maintenanceLog.create({
      data: {
        vehicleId: id,
        type,
        description,
        cost: cost ? parseFloat(cost) : null,
        mileage: mileage ? parseInt(mileage) : null,
        serviceDate: new Date(serviceDate),
        nextDue: nextDue ? new Date(nextDue) : null
      }
    });

    res.status(201).json({ message: 'Maintenance log added', log });
  } catch (error) {
    console.error('Add maintenance log error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
