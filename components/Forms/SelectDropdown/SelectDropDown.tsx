import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Modal, FlatList, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { TextStyle } from 'react-native';

export type DropdownItem = { label: string; value: string };

type CustomDropdownProps = {
    data: DropdownItem[];
    onSelect: (item: DropdownItem) => void;
    defaultText: string;
    dropdownStyle?: StyleProp<ViewStyle>;
    dropdownItemStyle?: StyleProp<ViewStyle>;
    dropdownTextStyle?: StyleProp<TextStyle>;
};



const screenHeight = Dimensions.get("window").height;

const SelectDropDown = ({
    data = [],
    onSelect,
    defaultText = "Select an option",
    dropdownStyle,
    dropdownItemStyle,
    dropdownTextStyle,
}: CustomDropdownProps) => {
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState<DropdownItem | null>(null);
    const [dropdownPosition, setDropdownPosition] = useState("below");
    const buttonRef = useRef<TouchableOpacity>(null);

    const toggleDropdown = () => {
        // Measure the position of the button and determine space availability
        buttonRef.current?.measure((fx: number, fy: number, width: number, height: number, px: number, py: number) => {
            const spaceBelow = screenHeight - (py + height);
            const spaceAbove = py;

            // Check if there’s more space below or above
            setDropdownPosition(spaceBelow > 200 || spaceBelow > spaceAbove ? "below" : "above");
            setDropdownVisible((prev) => !prev);
        });
    };

    const handleSelect = (item: DropdownItem) => {
        setSelectedItem(item);
        setDropdownVisible(false);
        onSelect(item); // Callback to parent with selected item
    };

    return (
        <View style={styles.container}>
            {/* Dropdown Button */}
            <TouchableOpacity
                ref={buttonRef}
                style={[styles.button, dropdownStyle]}
                onPress={toggleDropdown}
            >
                <Text style={styles.buttonText} className={selectedItem ? "text-black" : "text-gray-400"}>
                    {selectedItem ? selectedItem.label : defaultText}
                </Text>
                <AntDesign name="down" size={16} color="#333" style={styles.icon} />
            </TouchableOpacity>

            {/* Conditional Dropdown Display */}
            {isDropdownVisible && (
                <View
                    style={[
                        styles.dropdownContainer,
                        dropdownPosition === "below"
                            ? { top: "100%" }
                            : { bottom: "100%" },
                    ]}
                >
                    {data.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[styles.dropdownItem, dropdownItemStyle]}
                            onPress={() => handleSelect(item)}
                        >
                            <Text style={[styles.dropdownItemText, dropdownTextStyle]}>
                                {item.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    button: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 12,
        // backgroundColor: "#f0f0f0",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ccc",
    },
    buttonText: {
        fontSize: 13,
    },
    icon: {
        marginLeft: 8,
    },
    dropdownContainer: {
        position: "absolute",
        width: "100%",
        backgroundColor: "white",
        borderRadius: 8,
        marginTop: 4,
        borderWidth: 1,
        borderColor: "#ccc",
        maxHeight: 200,
        zIndex: 1000,
    },
    dropdownItem: {
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    dropdownItemText: {
        fontSize: 13,
        color: "#333",
    },
});

export default SelectDropDown;
