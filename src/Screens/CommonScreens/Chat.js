import React, {useEffect, useMemo, useState} from 'react';
import {KeyboardAvoidingView, Platform, StatusBar, StyleSheet, Text, View} from 'react-native';
import ScrollEnterFlatList from '../../Component/ScrollEnterFlatList';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation, useRoute} from '@react-navigation/native';
import ChatHeader from '../../Component/Chat/ChatHeader';
import ChatAnnouncementCard from '../../Component/Chat/ChatAnnouncementCard';
import ChatBubble from '../../Component/Chat/ChatBubble';
import ChatInputBar from '../../Component/Chat/ChatInputBar';
import AnimatedCard from '../../Component/AnimatedCard';
import {NAVY} from '../../Constants/CardTheme';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {CHAT_ANNOUNCEMENT, CHAT_MESSAGES, CHAT_USER} from '../../Constants/dummydata';
import {wp, hp} from '../../Constants/Responsive';
import {useRoleData} from '../../hooks/useRoleData';
import {withScreenEnter} from '../../hooks/useScreenEnterGate';
import {
  getChatBubbleEnter,
  getChatInputEnter,
  getChatSendEnter,
  getHomeScreenEnter,
} from '../../utils/cardAnimation';

const Chat = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {isParent, parentChatUser} = useRoleData();
  const [messages, setMessages] = useState(CHAT_MESSAGES);
  const [input, setInput] = useState('');
  const chatUser =
    route.params?.chatUser || (isParent ? parentChatUser : CHAT_USER);
  const isTeacherChat = !!route.params?.chatUser;

  const messageSlotStart = isTeacherChat ? 2 : 3;
  const CHAT_INPUT_SLOT = 50;
  const CHAT_SEND_SLOT = 51;

  useEffect(() => {
    setMessages(CHAT_MESSAGES);
    setInput('');
  }, [chatUser?.id, chatUser?.name]);

  const sendMessage = () => {
    const text = input.trim();
    if (!text) {
      return;
    }

    setMessages([
      ...messages,
      {
        id: String(messages.length + 1),
        text: text,
        type: 'sent',
        time: 'Now',
      },
    ]);
    setInput('');
  };

  const listHeader = useMemo(
    () => (
      <View>
        <AnimatedCard
          index={1}
          entering={getHomeScreenEnter(1)}
          style={styles.dateCard}>
          <View style={styles.dateWrap}>
            <Text style={styles.dateText} numberOfLines={1}>
              {Strings.chatToday}
            </Text>
          </View>
        </AnimatedCard>
        {isTeacherChat ? null : (
          <ChatAnnouncementCard
            item={CHAT_ANNOUNCEMENT}
            entering={getChatBubbleEnter(2, 'received')}
          />
        )}
      </View>
    ),
    [isTeacherChat],
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar
        backgroundColor={NAVY}
        barStyle="light-content"
        translucent={false}
      />

      <ChatHeader user={chatUser} onBack={() => navigation.navigate('Home')} />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollEnterFlatList
          data={messages}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => {
            const slot = messageSlotStart + index;
            return (
              <AnimatedCard
                index={slot}
                entering={getChatBubbleEnter(slot, item.type)}
                style={item.type === 'sent' ? styles.sentCard : styles.recvCard}>
                <ChatBubble item={item} />
              </AnimatedCard>
            );
          }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          bounces={false}
          overScrollMode="never"
          removeClippedSubviews={false}
          keyboardShouldPersistTaps="handled"
          ListHeaderComponent={listHeader}
        />

        <ChatInputBar
          value={input}
          onChangeText={setInput}
          onSend={sendMessage}
          inputEntering={getChatInputEnter(CHAT_INPUT_SLOT)}
          sendEntering={getChatSendEnter(CHAT_SEND_SLOT)}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default withScreenEnter(Chat, 'chat');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: NAVY,
  },
  flex: {
    flex: 1,
    backgroundColor: NAVY,
  },
  listContent: {
    paddingHorizontal: wp(4),
    paddingTop: hp(1.5),
    paddingBottom: hp(1),
  },
  dateCard: {
    alignSelf: 'center',
    marginBottom: hp(2),
  },
  dateWrap: {
    backgroundColor: Colors.whiteOverlay18,
    borderRadius: wp(4),
    paddingHorizontal: wp(4),
    paddingVertical: hp(0.6),
    borderWidth: 1,
    borderColor: Colors.whiteOverlay22,
  },
  dateText: {
    color: Colors.whiteMuted85,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
  },
  sentCard: {
    alignSelf: 'flex-end',
    maxWidth: wp(78),
    borderRadius: wp(4),
    overflow: 'hidden',
    marginBottom: hp(0.2),
  },
  recvCard: {
    alignSelf: 'flex-start',
    maxWidth: wp(78),
    borderRadius: wp(4),
    overflow: 'hidden',
    marginBottom: hp(0.2),
  },
});
