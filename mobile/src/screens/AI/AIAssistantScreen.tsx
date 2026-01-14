import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { NeonHeader, NeonButton } from '../../components/common';
import { Colors, Typography, Spacing, BorderRadius } from '../../theme/colors';
import { Ionicons } from '@expo/vector-icons';
import ApiService from '../../services/api';

export const AIAssistantScreen = ({ navigation }: any) => {
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: 'Hello! I\'m your CarFix AI assistant. Ask me anything about your vehicle, repairs, or maintenance.',
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setLoading(true);

    try {
      const response = await ApiService.sendChatMessage(inputText);

      const aiMessage = {
        id: (Date.now() + 1).toString(),
        text: response.message,
        sender: 'ai',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('AI chat error:', error);
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const MessageBubble = ({ message }: any) => {
    const isUser = message.sender === 'user';
    return (
      <View style={[styles.messageBubble, isUser ? styles.userBubble : styles.aiBubble]}>
        <Text style={[styles.messageText, isUser ? styles.userText : styles.aiText]}>
          {message.text}
        </Text>
        <Text style={styles.timestamp}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
    );
  };

  const QuickAction = ({ icon, text, onPress }: any) => (
    <TouchableOpacity style={styles.quickActionChip} onPress={onPress}>
      <Ionicons name={icon} size={16} color={Colors.neonBlue} />
      <Text style={styles.quickActionText}>{text}</Text>
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={90}
    >
      <NeonHeader title="AI Assistant" showBack={false} rightIcon="camera" onRightPress={() => navigation.navigate('ImageAnalysis')} />

      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
      >
        {messages.map(message => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {loading && (
          <View style={[styles.messageBubble, styles.aiBubble]}>
            <Text style={styles.loadingText}>AI is thinking...</Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.quickActions}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <QuickAction
            icon="car"
            text="Check Engine Light"
            onPress={() => setInputText('What does check engine light mean?')}
          />
          <QuickAction
            icon="build"
            text="Maintenance Tips"
            onPress={() => setInputText('What maintenance should I do?')}
          />
          <QuickAction
            icon="speedometer"
            text="Dashboard Symbols"
            onPress={() => setInputText('Explain dashboard warning symbols')}
          />
        </ScrollView>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ask me anything..."
          placeholderTextColor={Colors.textMuted}
          value={inputText}
          onChangeText={setInputText}
          multiline
          maxLength={500}
        />
        <TouchableOpacity
          style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
          onPress={sendMessage}
          disabled={!inputText.trim() || loading}
        >
          <Ionicons name="send" size={20} color={inputText.trim() ? Colors.darkBg : Colors.textMuted} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkBg,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: Spacing.lg,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.md,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: Colors.neonBlue,
  },
  aiBubble: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.cardBg,
  },
  messageText: {
    fontSize: Typography.fontSize.md,
    lineHeight: 20,
  },
  userText: {
    color: Colors.darkBg,
  },
  aiText: {
    color: Colors.textPrimary,
  },
  timestamp: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textMuted,
    marginTop: Spacing.xs,
  },
  loadingText: {
    fontSize: Typography.fontSize.md,
    color: Colors.textSecondary,
    fontStyle: 'italic',
  },
  quickActions: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
  },
  quickActionChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cardBg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    marginRight: Spacing.sm,
  },
  quickActionText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.neonBlue,
    marginLeft: Spacing.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
    backgroundColor: Colors.cardBg,
  },
  input: {
    flex: 1,
    backgroundColor: Colors.inputBg,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    fontSize: Typography.fontSize.md,
    color: Colors.textPrimary,
    maxHeight: 100,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.neonBlue,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: Spacing.sm,
  },
  sendButtonDisabled: {
    backgroundColor: Colors.inputBg,
  },
});
