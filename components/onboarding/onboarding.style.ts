import { SIZES } from "@/constants/sizes";
import { StyleSheet } from "react-native";

export const onboardingStyle = StyleSheet.create({
    container: {
        flex: 1,
       
    },
    onboardContains: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    onboardFooters: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: SIZES.spacing.xl,
        marginVertical: SIZES.spacing.xl,
    },
    labelContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: SIZES.spacing.lg,
        marginVertical: SIZES.spacing.xl,
        maxWidth:"60%"
    },
    dotContainer: {
        flexDirection: 'row',
        gap: SIZES.spacing.xl,
    },
    dot: {
        width: SIZES.spacing.xxl,
        height: SIZES.spacing.xxl,
        borderRadius: SIZES.radius.full,
    },
    dotActive: {
        backgroundColor: '#7C85FF',
        width: SIZES.spacing.xxxl,
        height: SIZES.spacing.xxxl,
    },
    dotInactive: {
        backgroundColor: '#CDD0F4',
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: SIZES.spacing.md,
    },
    button: {
        backgroundColor: '#7C85FF',
        paddingHorizontal: SIZES.spacing.xxl,
        paddingVertical: SIZES.spacing.md,
        borderRadius: SIZES.radius.xl,
    },
 
});