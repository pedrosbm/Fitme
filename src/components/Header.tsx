import { Appbar } from "react-native-paper";

type HeaderProps = {
    navigation: any,
    options: any,
    back: any,
    actions: Action[]
}

type Action = {
    icon: string,
    onPress: () => void,
    disabled: boolean
}

export default function Header({ navigation, options, back, actions }: HeaderProps) {

    return (
        <Appbar.Header>
            {/* Displays back conditionally */}
            {back && <Appbar.BackAction onPress={navigation.goBack} />}

            <Appbar.Content title={options.title} />

            {<Appbar.Action icon={"menu"} />}

            {actions.forEach(action => (
                <Appbar.Action
                    icon={action.icon}
                    onPress={action.onPress}
                    disabled={action.disabled}
                />
            ))}

        </Appbar.Header>
    )
}