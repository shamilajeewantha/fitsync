import * as React from 'react';
import { Card, Text } from 'react-native-paper';

//       <Text variant="bodyMedium">The uncharted territory awaits you...</Text>


type RegisterCardProps = {
  onPress: () => void;
};

const ShopCard: React.FC<RegisterCardProps> = ({ onPress }) => (
  <Card onPress={onPress}>
    <Card.Cover source={require('@/assets/images/shop.png')} />
    <Card.Content>
      <Text variant="titleLarge">Shop</Text>
    </Card.Content>
  </Card>
);

export default ShopCard;
