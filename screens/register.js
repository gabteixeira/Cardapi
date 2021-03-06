import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Alert} from 'react-native';
import {globalStyles} from '../styles/global';
import {Formik} from 'formik';
import { MaterialIcons } from '@expo/vector-icons'; 
import {firebase} from '../utils/firebase';
import * as yup from 'yup';
import PopUpMsg from '../shared/PopUpMsg';



const UserSchema  = yup.object({
    name: yup.string().required('Digite um nome válido').min(2,'Digite um nome maior'),
    cpf: yup.string().min(11,'O cpf deve ter 11 números').max(11,'O cpf deve ter 11 números'),
    phone: yup.string().required('Digite um telefone válido'),
    passwordConfirm: yup.string().oneOf([yup.ref('password'),null], "As senhas devem ser iguais!"),
})

export default function Register({navigation}) {
    const [errorMsg, setError] = useState('');
    const [modal,setModal] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [hidePass, setHidePass] = useState(true);
    const [hidePassConfirm, setHidePassConfirm] = useState(true);

    const LoginUser = () =>{
        navigation.navigate('Login')
    }

    return(
        <View style={styles.containerForms}>     
        <Formik
            initialValues={{name:'', cpf:'', phone:'', email:'', password:'', passwordConfirm:''}}
            validationSchema={UserSchema}
            onSubmit={ async (values) => {
                try{
                    await firebase.auth().createUserWithEmailAndPassword(values.email,values.password).then((response) =>{
                        firebase.auth().currentUser.updateProfile({
                            displayName:values.name,
                            photoURL:'default_profile.png'
                        }).then(() =>{
                            firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/profile').set({
                                name:values.name,
                                cpf:values.cpf,
                                phone:values.phone,
                            })
                        })
                    }).then(() =>{
                        setModal(true)
                    })
                } catch(e){
                    console.log(e.code)
                    if(e.code == 'auth/email-already-in-use'){
                        setError('O email inserido já está em uso');
                    } else if(e.code == 'auth/invalid-email'){
                        setError("O email inserido não é válido. Digite um email válido.");
                    } else if(e.code == 'auth/operation-not-allowed'){
                        setError('Seu email ' + values.email + " não é válido.")
                    } else if(e.code == 'auth/weak-password'){
                        setError('Sua senha não é forte o suficiente. Use números e caracteres para criar uma senha forte');
                    }   
                }
            }}
        >
            {(props) => (
                <KeyboardAvoidingView
                behavior='height'>
                    <PopUpMsg message="Parabéns, seu cadastro foi um sucesso. Agora aproveite os melhores restaurantes!" onClosed={LoginUser} isOk={true} isOpen={modal} />
                    <TextInput 
                        style={{...globalStyles.normalInput, marginTop:"5.468%"}}
                        placeholder="Nome"
                        onChangeText={props.handleChange('name')}
                        value={props.values.name}
                    />
                    <Text style={styles.errorStyle}>{props.errors.name}</Text>  

                    <TextInput
                           style={globalStyles.normalInput}
                        placeholder="CPF"
                        keyboardType = 'numeric'
                        onChangeText={props.handleChange('cpf')}
                        value={props.values.cpf} />
                    <Text style={styles.errorStyle}>{props.errors.cpf}</Text>  

                    <TextInput
                        style={globalStyles.normalInput}
                        placeholder="Telefone"
                        keyboardType = 'numeric'
                        onChangeText={props.handleChange('phone')}
                        value={props.values.phone} />
                    <Text style={styles.errorStyle}>{props.errors.phone}</Text>  

                    <TextInput
                        style={globalStyles.normalInput}
                        placeholder="E-mail"
                        onChangeText={props.handleChange('email')}
                        value={props.values.email} />

                    <View style={styles.passwordEye}>
                        <TextInput
                            style={{flex:1}}
                            placeholder="Senha"
                            secureTextEntry={hidePass}
                            onChangeText={props.handleChange('password')}
                            value={props.values.password} />
                            <TouchableOpacity onPress={() => setHidePass(!hidePass)}>
                                <MaterialIcons name='remove-red-eye' size={24} color="black" style={{padding:10}} />
                            </TouchableOpacity>
                    </View>  

                    <View style={styles.passwordEye}>
                        <TextInput
                            style={{flex:1}}
                            placeholder="Confirmar Senha"
                            secureTextEntry={hidePassConfirm}
                            onChangeText={props.handleChange('passwordConfirm')}
                            value={props.values.passwordConfirm} />
                            <TouchableOpacity onPress={() => setHidePassConfirm(!hidePassConfirm)}>
                                <MaterialIcons name='remove-red-eye' size={24} color="black" style={{padding:10}} />
                            </TouchableOpacity>
                    </View>
                    <Text style={styles.errorStyle}>{props.errors.passwordConfirm}</Text>        
                    <View style={{alignItems:"center"}}>
                        <TouchableOpacity style={globalStyles.mediumButtonStyle} onPress={props.handleSubmit}>
                            <Text style={{color:"#FAFAFA"}}>Confirmar</Text>
                        </TouchableOpacity>
                    <Text style={{...globalStyles.legenda1, color: "#A60400"}}>{errorMsg}</Text>

                        <TouchableOpacity onPress={LoginUser}>
                        <View style={{flexDirection:"row"}}>
                            <Text style={{...globalStyles.body3, marginTop:"14.06%"}}>Já possui conta? Faça o <Text style={{color:"#A60400"}}>Login</Text></Text>
                        </View>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            )}
        </Formik>
    </View> 
    );
}


const styles = StyleSheet.create({
    container:{
        flex:1,

    },
    containerForms:{
        flex:1,
        backgroundColor:"white",
        borderRadius:16,
    },
    passwordEye:{
        paddingLeft:"5%",
        marginTop:"3.125%",
        borderRadius:8,
        minWidth:"88%",
        height:45,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:"#E5E5E5",
    },
    errorStyle:{
        ...globalStyles.legenda1,
        color: "#A60400"
    }
})