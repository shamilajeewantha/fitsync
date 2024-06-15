import * as React from 'react';
import { Card, Text } from 'react-native-paper';

type RegisterCardProps = {
  onPress: () => void;
};

const SignUpCard: React.FC<RegisterCardProps> = ({ onPress }) => (
  <Card onPress={onPress}>
    <Card.Cover source={require('@/assets/images/registercard.jpg')} />
    <Card.Content>
      <Text variant="titleLarge">Sign Up</Text>
      <Text variant="bodyMedium">The uncharted territory awaits you...</Text>
    </Card.Content>
  </Card>
);

export default SignUpCard;
