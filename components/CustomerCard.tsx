import * as React from 'react';
import { Card, Text } from 'react-native-paper';

//       <Text variant="bodyMedium">The uncharted territory awaits you...</Text>


type RegisterCardProps = {
  onPress: () => void;
};

const CustomerCard: React.FC<RegisterCardProps> = ({ onPress }) => (
  <Card onPress={onPress}>
    <Card.Cover source={require('@/assets/images/customer.jpg')} />
    <Card.Content>
      <Text variant="titleLarge">Customer</Text>
    </Card.Content>
  </Card>
);

export default CustomerCard;
