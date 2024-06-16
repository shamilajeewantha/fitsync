import * as React from 'react';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';


const LeftContent = props => <Avatar.Icon {...props} icon="ruler" style={styles.avatarIcon}/>

const OrderCard = ({ order }) => (
  <Card style={styles.card}>
    <Card.Title title={order.order_placed_date.substring(0, 10)}  left={LeftContent} />
    <Card.Content>
      <Text style={styles.shopName} variant="titleLarge">{order.shop.shop_name}</Text>
      <Text variant="bodyMedium">{order.order_comments}</Text>
    </Card.Content>
    <Card.Actions>
      <Button textColor="#eb3483">Cancel</Button>
      <Button style={styles.button}>View</Button>
    </Card.Actions>
  </Card>

);


const styles = StyleSheet.create({

    card: {
      backgroundColor: '#ffb3cf', // Card background color
      marginVertical: 10,

    },
    avatarIcon: {
      backgroundColor: '#eb3483', // Avatar icon background color
    },

    button: {
      backgroundColor: '#eb3483', // Button background color
    },
    shopName: {
      fontWeight: 'bold',
    }
  });

export default OrderCard;

