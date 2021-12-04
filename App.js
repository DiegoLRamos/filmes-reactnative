import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';

import api from './src/services/api';

import Filmes from './src/components/Filmes';

export default function App(){
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilmes(){
      const response = await api.get('r-api/?api=filmes');
      setFilmes(response.data);
      setLoading(false);
    }

    loadFilmes();
  }, []);


  if(loading){
    return(
      <View style={styles.loading}>
        <ActivityIndicator color="#121212" size={45} />
      </View>
    )
  } else{
    return(
      <View style={styles.container}>
        <FlatList 
          data={filmes}
          keyExtractor={ item => String(item.id) }
          renderItem={ ({ item }) => <Filmes data={item} /> }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    marginTop: 35,
  },
  loading:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});