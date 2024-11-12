import { View, Text } from 'react-native'
import React from 'react'
import { TextInput as RNTextInput } from 'react-native'
import { TextInputProps } from 'react-native/Libraries/Components/TextInput/TextInput'
import { cn } from '@/lib/cn'

const TextInput = (props: TextInputProps) => {
    return (
        <RNTextInput {...props} className={cn([props.className], 'text-sm')} cursorColor={props.cursorColor || '#436697'} />
    )
}

export default TextInput