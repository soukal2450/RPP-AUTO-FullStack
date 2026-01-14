const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.chat = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { message, conversationId } = req.body;

    // Mock AI response - integrate with OpenAI/Anthropic in production
    const aiResponse = generateAIResponse(message);

    // Save conversation
    const conversation = conversationId
      ? await prisma.aIConversation.findUnique({ where: { id: conversationId } })
      : await prisma.aIConversation.create({ data: { userId, messages: [] } });

    const messages = conversation.messages;
    messages.push(
      { role: 'user', content: message, timestamp: new Date() },
      { role: 'assistant', content: aiResponse, timestamp: new Date() }
    );

    await prisma.aIConversation.update({
      where: { id: conversation.id },
      data: { messages }
    });

    res.json({ message: aiResponse, conversationId: conversation.id });
  } catch (error) {
    console.error('AI chat error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.analyzeImage = async (req, res) => {
  try {
    const { image } = req.body;

    // Mock image analysis - integrate with vision AI in production
    const analysis = {
      damage: 'Minor dent on front bumper',
      severity: 'low',
      estimatedCost: '$200-$400',
      recommendations: [
        'Paintless dent repair recommended',
        'No structural damage detected'
      ]
    };

    res.json({ analysis });
  } catch (error) {
    console.error('Image analysis error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getRecommendations = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Get user's vehicles and recent diagnostics
    const vehicles = await prisma.vehicle.findMany({
      where: { userId },
      include: {
        diagnostics: {
          orderBy: { scanDate: 'desc' },
          take: 3
        }
      }
    });

    // Generate AI recommendations based on vehicle data
    const recommendations = [
      {
        type: 'maintenance',
        priority: 'high',
        message: 'Oil change recommended in 500 miles',
        actionable: true
      },
      {
        type: 'diagnostic',
        priority: 'medium',
        message: 'P0420 code detected - schedule catalyst inspection',
        actionable: true
      }
    ];

    res.json({ recommendations });
  } catch (error) {
    console.error('Get recommendations error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

function generateAIResponse(message) {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('check engine') || lowerMessage.includes('warning light')) {
    return "The check engine light indicates your vehicle's onboard diagnostic system has detected an issue. I recommend getting a diagnostic scan to read the specific error codes. Would you like me to help you find nearby mechanics?";
  }

  if (lowerMessage.includes('oil change')) {
    return "Regular oil changes are typically needed every 3,000-5,000 miles for conventional oil, or 7,500-10,000 miles for synthetic oil. Check your owner's manual for your vehicle's specific recommendation.";
  }

  if (lowerMessage.includes('brake')) {
    return "Brake issues should be addressed immediately for safety. Common signs include squeaking, grinding noises, or a soft brake pedal. I can help you find certified brake specialists nearby.";
  }

  return "I'm here to help with your automotive questions! You can ask me about diagnostic codes, maintenance schedules, finding parts, or booking service appointments.";
}
