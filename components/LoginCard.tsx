// components/LoginCard.tsx
import * as React from 'react';
import { Card, Text } from 'react-native-paper';

type LoginCardProps = {
  onPress: () => void;
};

const LoginCard: React.FC<LoginCardProps> = ({ onPress }) => (
  <Card onPress={onPress}>
    <Card.Cover source={require('@/assets/images/logincard.jpg')} />
    <Card.Content>
      <Text variant="titleLarge">Login</Text>
      <Text variant="bodyMedium">A world tailored just for you. Login to discover it...</Text>
    </Card.Content>
  </Card>
);

export default LoginCard;
