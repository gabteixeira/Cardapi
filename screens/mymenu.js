import React from 'react';
import {View, Text,StyleSheet,ScrollView,Image} from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { globalStyles } from '../styles/global';
import { MaterialIcons } from '@expo/vector-icons';


export default function MyMenu(){
    const pratos = [
        {nome: "Macarronada Toscana", 
        descricao: "Macarronada feita com frango, curry e couve flor",
        preco: 32.90,
        key:'1',
        media_avaliacao: 4.2,
        num_avaliacao: 10,
        foto: require("../assets/images/pagina_restaurante_pomba_assada.png")
        },
        {nome: "Carne Assada ao Rum", 
        descricao: "Medalhão de alcatra acompanhando de batatas rústicas e molho especial",
        preco: 67.90,
        key:'2',
        media_avaliacao: 4.7,
        num_avaliacao: 24,
        foto: require("../assets/images/pagina_restaurante_pomba_assada.png") 
        },
        {nome: "Carne Assada ao Rum", 
        descricao: "Medalhão de alcatra acompanhando de batatas rústicas e molho especial",
        preco: 67.90,
        media_avaliacao: 4.7,
        key:'3',
        num_avaliacao: 24,
        foto: require("../assets/images/pagina_restaurante_pomba_assada.png")  
        },
    ];

    const renderPratos = (item) => {
        console.log(item)
        return(
            <View style={{...styles.cardContainer}}>
                <View style={styles.cardContent}>
                    <View>
                        <Text style={globalStyles.sub1}>{item.item.nome}</Text>
                    </View>
                    
                    <View style={globalStyles.legenda1, styles.descricao}>
                        <Text>{item.item.descricao}</Text>
                    </View>
                    
                    <View style={styles.sideInformation}>
                        <Text style={{...globalStyles.sub1, flex: 3}}>R${item.item.preco}</Text>
                        <MaterialIcons style={{marginRight: 2}} name="star" size={15} color="#000" />
                        <Text style={globalStyles.body4}>{item.item.media_avaliacao}({item.item.num_avaliacao})</Text>
                    </View> 
                </View>
                <Image style={{width: "36%", height:"auto"}} source={item.item.foto}/>
            </View>
        );
    }

    const renderAcompanhamentos = (item) => {
        return(
            <View style={{marginBottom:"4%", marginLeft: 10}}>
                <Text style={{...globalStyles.sub2,...globalStyles.preto2}}>{item.item.nome}</Text>
                <Text style={{...globalStyles.body3, ...globalStyles.preto2}}>R$ {item.item.preco}</Text>
            </View>
        )
    }

    return(
        <ScrollView style={{backgroundColor:'white'}}>
            <View style={{backgroundColor:'white', marginBottom:"50%"}}>
                <View style={styles.container}>
                    <View style={styles.section}>
                        <View style={styles.headerSection}>
                            <Text style={{...globalStyles.sub1}}>Pratos</Text>
                            <TouchableOpacity>
                                <Text style={{...globalStyles.body3, ...globalStyles.vermelho1}}>+ Adicionar</Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList data={pratos} renderItem={renderPratos} />
                    </View>

                    <View style={styles.section}>
                        <View style={styles.headerSection}>
                            <Text style={{...globalStyles.sub1}} >Bebidas</Text>
                            <TouchableOpacity>
                                <Text style={{...globalStyles.body3, ...globalStyles.vermelho1}}>+ Adicionar</Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList data={pratos}  renderItem={renderPratos} />
                    </View>

                    <View style={styles.section}>
                        <View style={styles.headerSection}>
                            <Text style={{...globalStyles.sub1}}>Sobremesas</Text>
                            <TouchableOpacity>
                                <Text style={{...globalStyles.body3, ...globalStyles.vermelho1}}>+ Adicionar</Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList data={pratos}  renderItem={renderPratos} />
                    </View>

                    <View style={styles.section}>
                        <View style={{...styles.headerSection, borderBottomColor:'transparent'}}>
                            <Text style={{...globalStyles.sub1}}>Acompanhamento</Text>
                            <TouchableOpacity>
                                <Text style={{...globalStyles.body3, ...globalStyles.vermelho1}}>+ Adicionar</Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList data={pratos}  renderItem={renderAcompanhamentos}/>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'white',
        marginLeft:'4%',
        marginRight:'4%',
    },

    headerSection:{
        flexDirection:'row',
        marginBottom:"3%",
        marginLeft:"3%",
        marginRight:"3%",
        justifyContent:'space-between'
    },
    section:{
        borderBottomWidth:2,
        marginTop:"5%",
        borderBottomColor:"#BFBFBF",
    },
    cardContent: {
        maxWidth: "60%",
        padding:10
    },
    cardContainer: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: "#E5E5E5",
        height: "auto",
        marginBottom:"5%",
        marginTop: 5,
        marginRight: 10,
        marginLeft: 10,
        borderRadius: 8,
    },
    descricao: {
        flex: 3,
    },
    sideInformation:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
})