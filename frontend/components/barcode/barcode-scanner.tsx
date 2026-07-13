import {BarCodeScanner} from 'expo-barcode-scanner';
import {CameraView, useCameraPermissions} from 'expo-camera'
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS } from '@/constants/colors'; 

interface BarcodeScannerProps {
    onBarcodeScan: (barcode: string) => void;
    onClose: () => void;
}
export const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ 
    onBarcodeScan, 
    onClose 
}) => {
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);

    // Request camera permission on mount
    useEffect(() => {
        if (!permission?.granted) {
            requestPermission();
        }
    }, [permission, requestPermission]);

    // Handle barcode scanned
    const handleBarcodeScan = ({ type, data }: any) => {
        setScanned(true);
        onBarcodeScan(data);
        // Optionally auto-close after scan
        setTimeout(() => setScanned(false), 500);
    };

    if (!permission) {
        return (
            <View style={styles.permissionContainer}>
                <Text style={styles.permissionText}>
                    Camera permission required
                </Text>
                <TouchableOpacity 
                    style={styles.button}
                    onPress={requestPermission}
                >
                    <Text style={styles.buttonText}>Grant Permission</Text>
                </TouchableOpacity>
            </View>
        );
    }

    if (!permission.granted) {
        return (
            <View style={styles.permissionContainer}>
                <Text style={styles.permissionText}>
                    Camera permission denied
                </Text>
                <Text style={styles.permissionSubtext}>
                    Enable camera access in settings
                </Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <CameraView
                style={styles.camera}
                barcodeScannerSettings={{
                    barcodeTypes: [
                        'ean13',
                        'ean8',
                        'qr',
                        'pdf417',
                        'aztec',
                        'datamatrix',
                        'code39',
                        'code128',
                    ],
                }}
                onBarcodeScanned={scanned ? undefined : handleBarcodeScan}
            >
                <View style={styles.overlay}>
                    <View style={styles.scanningFrame}>
                        <View style={[styles.corner, { top: 0, left: 0 }]} /> 
                        <View style={[styles.corner, { top: 0, left: 0 }]} />
                        <View style={[styles.corner, { top: 0, left: 0 }]} />
                        <View style={[styles.corner, { top: 0, left: 0 }]} /> 
                    </View>

                    <View style={styles.instructionContainer}>
                        <Text style={styles.instructionText}>
                            Point camera at barcode
                        </Text>
                    </View>

                    {scanned && (
                        <View style={styles.scannedOverlay}>
                            <Text style={styles.scannedText}>✓ Scanned!</Text>
                        </View>
                    )}

                    <TouchableOpacity 
                        style={styles.cancelButton}
                        onPress={onClose}
                    >
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>

                </View>
            </CameraView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: SPACING.xl,
    },
    camera: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    permissionContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.BRAND.LIGHT_BACKGROUND,
        gap: SPACING.md,
    },
    permissionText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.TEXT.PRIMARY,
        textAlign: 'center',
    },
    permissionSubtext: {
        fontSize: 14,
        color: COLORS.TEXT.SECONDARY,
        textAlign: 'center',
    },
    button: {
        backgroundColor: COLORS.BRAND.DARK_NAVY,
        paddingHorizontal: SPACING.xl,
        paddingVertical: SPACING.md,
        borderRadius: BORDER_RADIUS.PILL,
    },
    buttonText: {
        color: COLORS.SEMANTIC.WHITE,
        fontWeight: '600',
        fontSize: 16,
    },
    scanningFrame: {
        width: 300,
        height: 200,
        borderColor: COLORS.SEMANTIC.SUCCESS_TEAL,
        borderWidth: 2,
        borderRadius: BORDER_RADIUS.MEDIUM,
        position: 'relative',
        justifyContent: 'space-between',
        alignItems:'center',
    },
    corner:{
        position: 'absolute' as const,
        width: 30,
        height: 30,
        borderTopColor: COLORS.SEMANTIC.SUCCESS_TEAL,
        borderLeftColor: COLORS.SEMANTIC.SUCCESS_TEAL,
        borderTopWidth: 3,
        borderLeftWidth: 3,
        top: 0,
        right: 0,
    },
    instructionContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        paddingVertical: SPACING.md,
        paddingHorizontal: SPACING.lg,
        borderRadius: BORDER_RADIUS.LARGE,
        marginTop: SPACING.lg,
    },
    instructionText: {
        color: COLORS.SEMANTIC.WHITE,
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
    },
    cancelButton: {
        backgroundColor: COLORS.BRAND.DARK_NAVY,
        paddingHorizontal: SPACING.xl,
        paddingVertical: SPACING.md,
        borderRadius: BORDER_RADIUS.PILL,
        marginBottom: SPACING.xl,
    },
    cancelButtonText: {
        color: COLORS.SEMANTIC.WHITE,
        fontWeight: '600',
        fontSize: 16,
    },
    scannedOverlay: {
        backgroundColor: 'rgba(29, 158, 117, 0.9)',
        paddingVertical: SPACING.lg,
        paddingHorizontal: SPACING.xl,
        borderRadius: BORDER_RADIUS.PILL,
        position: 'absolute',
        bottom: SPACING.xl,
    },
    scannedText: {
        color: COLORS.SEMANTIC.WHITE,
        fontWeight: '700',
        fontSize: 16,
    },
});