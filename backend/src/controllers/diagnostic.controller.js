const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.runDiagnostic = async (req, res) => {
  try {
    const { vehicleId } = req.body;
    const userId = req.user.userId;

    // Mock diagnostic scan - in production, integrate with OBD-II device
    const errorCodes = [
      { code: 'P0420', description: 'Catalyst System Efficiency Below Threshold' },
      { code: 'P0171', description: 'System Too Lean (Bank 1)' }
    ];

    const diagnostic = await prisma.diagnostic.create({
      data: {
        userId,
        vehicleId,
        errorCodes: errorCodes,
        severity: 'medium',
        description: 'Found 2 diagnostic trouble codes',
        recommendation: 'Schedule service appointment for catalyst and fuel system check'
      }
    });

    res.json({ message: 'Diagnostic scan completed', data: diagnostic });
  } catch (error) {
    console.error('Diagnostic scan error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getDiagnosticHistory = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { vehicleId } = req.query;

    const where = { userId };
    if (vehicleId) where.vehicleId = vehicleId;

    const scans = await prisma.diagnostic.findMany({
      where,
      include: { vehicle: true },
      orderBy: { scanDate: 'desc' }
    });

    res.json({ scans });
  } catch (error) {
    console.error('Get diagnostic history error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getDiagnosticDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const diagnostic = await prisma.diagnostic.findFirst({
      where: { id, userId },
      include: { vehicle: true }
    });

    if (!diagnostic) {
      return res.status(404).json({ message: 'Diagnostic record not found' });
    }

    res.json({ diagnostic });
  } catch (error) {
    console.error('Get diagnostic details error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.resolveDiagnostic = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    await prisma.diagnostic.updateMany({
      where: { id, userId },
      data: { resolved: true }
    });

    res.json({ message: 'Diagnostic marked as resolved' });
  } catch (error) {
    console.error('Resolve diagnostic error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
