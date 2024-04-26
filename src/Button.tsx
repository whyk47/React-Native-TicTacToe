import { View, Text, Pressable, StyleSheet, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import { PropsWithChildren } from 'react'

type Props = PropsWithChildren<{
    onPress: Function,
    child: JSX.Element,
    color: string,
    disabled?: boolean
}>
const Button = ({ onPress, child, color, disabled }: Props) => {
    return (
        <TouchableOpacity
            onPress={() => onPress()}
            disabled={disabled}
        >
            <View style={[styles.button, { backgroundColor: color }]}>
                {child}
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    button: {
        borderRadius: 10,
        padding: 10,
        marginVertical: 10,
        marginHorizontal: 5,
        elevation: 5,
        shadowColor: 'black',
        shadowOffset: {
            width: 2,
            height: 2,
        },
        backgroundColor: 'gray',
    },
})
export default Button