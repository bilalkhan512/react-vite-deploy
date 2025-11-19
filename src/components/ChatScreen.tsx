import { useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Send, Search } from "lucide-react";

interface Message {
  id: string;
  userId: string;
  userName: string;
  text: string;
  timestamp: string;
  isAdmin: boolean;
}

interface ChatUser {
  id: string;
  name: string;
  lastMessage: string;
  unread: number;
}

const mockUsers: ChatUser[] = [
  { id: "U001", name: "John Doe", lastMessage: "Thanks for the help!", unread: 2 },
  { id: "U002", name: "Jane Smith", lastMessage: "When will my withdrawal be processed?", unread: 1 },
  { id: "U003", name: "Bob Johnson", lastMessage: "Got it, thank you!", unread: 0 },
  { id: "U004", name: "Alice Williams", lastMessage: "I need help with my account", unread: 3 },
];

const mockMessages: Record<string, Message[]> = {
  "U001": [
    { id: "1", userId: "U001", userName: "John Doe", text: "Hello, I have a question", timestamp: "10:30 AM", isAdmin: false },
    { id: "2", userId: "admin", userName: "Admin", text: "Hi! How can I help you?", timestamp: "10:31 AM", isAdmin: true },
    { id: "3", userId: "U001", userName: "John Doe", text: "Thanks for the help!", timestamp: "10:35 AM", isAdmin: false },
  ],
  "U002": [
    { id: "1", userId: "U002", userName: "Jane Smith", text: "When will my withdrawal be processed?", timestamp: "11:20 AM", isAdmin: false },
  ],
};

export function ChatScreen() {
  const [selectedUser, setSelectedUser] = useState<ChatUser | null>(mockUsers[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState(mockMessages);

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (messageText.trim() && selectedUser) {
      const newMessage: Message = {
        id: Date.now().toString(),
        userId: "admin",
        userName: "Admin",
        text: messageText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isAdmin: true
      };

      setMessages({
        ...messages,
        [selectedUser.id]: [...(messages[selectedUser.id] || []), newMessage]
      });
      setMessageText("");
    }
  };

  const currentMessages = selectedUser ? messages[selectedUser.id] || [] : [];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1>Chat Support</h1>
        <p className="text-muted-foreground">Communicate with users in real-time</p>
      </div>

      <div className="grid grid-cols-12 gap-4 h-[calc(100vh-200px)]">
        {/* User List Panel */}
        <Card className="col-span-12 md:col-span-4 shadow-lg flex flex-col">
          <div className="p-4 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-input-background"
              />
            </div>
          </div>
          
          <ScrollArea className="flex-1">
            <div className="p-2">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  onClick={() => setSelectedUser(user)}
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors ${
                    selectedUser?.id === user.id ? "bg-muted" : ""
                  }`}
                >
                  <Avatar>
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="truncate">{user.name}</p>
                      {user.unread > 0 && (
                        <span className="bg-primary text-primary-foreground text-xs rounded-full px-2 py-0.5">
                          {user.unread}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{user.lastMessage}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>

        {/* Chat Window */}
        <Card className="col-span-12 md:col-span-8 shadow-lg flex flex-col">
          {selectedUser ? (
            <>
              <div className="p-4 border-b border-border flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {selectedUser.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3>{selectedUser.name}</h3>
                  <p className="text-xs text-muted-foreground">{selectedUser.id}</p>
                </div>
              </div>

              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {currentMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isAdmin ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          message.isAdmin
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <p className={`text-xs mt-1 ${message.isAdmin ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="p-4 border-t border-border">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type your message..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="bg-input-background"
                  />
                  <Button 
                    onClick={handleSendMessage}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              Select a user to start chatting
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
