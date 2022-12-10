import {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';

export function useClientPage() {
  const [contacts, setContacts] = useState({
    contactList: undefined,
    client: undefined,
  });

  const getUsers = async () => {
    const subscriber = await firestore()
      .collection('Users')
      .onSnapshot(
        usersSnapshot => {
          console.log('Users collection2:', usersData);
          const usersData = usersSnapshot.docs.map(doc => doc.data());
          setContacts(
            usersData.reduce(
              (acc, curr) => {
                if (curr.type === 'client') {
                  acc.client = curr;
                  return acc;
                }
                acc.contactList?.push(curr);
                return acc;
              },
              {contactList: [], client: undefined},
            ),
          );
        },
        er => console.log(er),
      );
    return subscriber;
  };

  useEffect(() => {
    const subscriber = getUsers();

    return () => {
      typeof subscriber === 'function' && subscriber();
    };
  }, []);

  return {contactList: contacts.contactList, client: contacts.client};
}
