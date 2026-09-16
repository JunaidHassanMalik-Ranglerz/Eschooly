import React, {useEffect, useState} from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation, useRoute} from '@react-navigation/native';
import ChatHeader from '../../Component/Chat/ChatHeader';
import ChatAnnouncementCard from '../../Component/Chat/ChatAnnouncementCard';
import ChatBubble from '../../Component/Chat/ChatBubble';
import ChatInputBar from '../../Component/Chat/ChatInputBar';
import {Colors} from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import {Fontsize} from '../../Constants/Fontsize';
import {Strings} from '../../Constants/Strings';
import {CHAT_ANNOUNCEMENT, CHAT_MESSAGES, CHAT_USER} from '../../Constants/dummydata';
import {wp, hp} from '../../Constants/Responsive';
import {useRoleData} from '../../hooks/useRoleData';

const Chat = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {isParent, parentChatUser} = useRoleData();
  const [messages, setMessages] = useState(CHAT_MESSAGES);
  const [input, setInput] = useState('');
  const chatUser =
    route.params?.chatUser || (isParent ? parentChatUser : CHAT_USER);
  const isTeacherChat = !!route.params?.chatUser;

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

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar
        backgroundColor={Colors.white}
        barStyle="dark-content"
        translucent={false}
      />

      <ChatHeader
        user={chatUser}
        onBack={() => navigation.navigate('Home')}
      />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <FlatList
          data={messages}
          keyExtractor={item => item.id}
          renderItem={({item}) => <ChatBubble item={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={
            <View>
              <View style={styles.dateWrap}>
                <Text style={styles.dateText} numberOfLines={1}>
                  {Strings.chatToday}
                </Text>
              </View>
              {isTeacherChat ? null : (
                <ChatAnnouncementCard item={CHAT_ANNOUNCEMENT} />
              )}
            </View>
          }
        />

        <ChatInputBar
          value={input}
          onChangeText={setInput}
          onSend={sendMessage}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.chatScreenBg,
  },
  flex: {
    flex: 1,
    backgroundColor: Colors.chatScreenBg,
  },
  listContent: {
    paddingHorizontal: wp(4),
    paddingTop: hp(1.5),
    paddingBottom: hp(1),
  },
  dateWrap: {
    alignSelf: 'center',
    backgroundColor: Colors.white,
    borderRadius: wp(4),
    paddingHorizontal: wp(4),
    paddingVertical: hp(0.6),
    marginBottom: hp(2),
    borderWidth: 1,
    borderColor: Colors.border,
  },
  dateText: {
    color: Colors.grayText,
    fontFamily: Fonts.regular,
    fontSize: Fontsize.xs1,
  },
});
