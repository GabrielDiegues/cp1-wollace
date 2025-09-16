import { StyleProp, Text, TouchableOpacity, ViewStyle } from "react-native";

// Outer variables
type BaseButtonProps = {
    buttonTitle: string;
    buttonStyle: StyleProp<ViewStyle>
    isDisabled?: boolean
    onPress: () => void;
}

export default function BaseButton({buttonTitle, buttonStyle, onPress, isDisabled}: BaseButtonProps) {
    return (
        <TouchableOpacity
        style={[buttonStyle, isDisabled && {opacity: 0.5}]}
        onPress={onPress}
        disabled={isDisabled}
        >
            <Text style={[{color: 'white'}]}>{buttonTitle}</Text>
        </TouchableOpacity>
    )
}