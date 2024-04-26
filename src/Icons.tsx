import React from 'react'
import { PropsWithChildren } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import { X, O, EMPTY, XColor, OColor, EmptyColor } from './constants'
import { StyleSheet } from 'react-native'

type Props = PropsWithChildren<{
    name: string
}>


const Icons = ({name}: Props) => {
    switch(name) {
        case O:
            return <Icon name="circle-thin" size={38} color={OColor} />
        case X:
            return <Icon name="times" size={38} color={XColor} />
        default:
            return <Icon name="pencil" size={38} color={EmptyColor} />
    }
}


export default Icons