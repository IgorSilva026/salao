import { StyleSheet } from 'react-native';
import {colors,spacing,fontSize,fontWeight,radius,} from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.xxxl,
    maxWidth: 500,
    width: '100%',
    alignSelf: 'center',
  },

  logo: {
    fontSize: fontSize.display,
    fontWeight: fontWeight.bold,
    color: colors.primary,
    textAlign: 'center',
    letterSpacing: 5,
    marginBottom: spacing.sm,
  },

  subtitle: {
    textAlign: 'center',
    color: colors.textSubtle,
    letterSpacing: 3,
    fontSize: fontSize.xs,
    marginBottom: spacing.xxxl,
  },

  title: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.text,
  },

  description: {
    fontSize: fontSize.md,
    color: colors.textMuted,
    marginTop: spacing.sm,
    marginBottom: spacing.xl,
  },

  label: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    color: colors.label,
    marginBottom: spacing.sm,
  },

  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.lg,
    fontSize: fontSize.md,
    marginBottom: spacing.lg,
    color: colors.text,
  },

  button: {
    backgroundColor: colors.primary,
    padding: spacing.lg,
    borderRadius: radius.md,
    alignItems: 'center',
    marginTop: spacing.sm,
  },

  buttonText: {
    color: colors.onPrimary,
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
  },

  register: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.xxl,
  },

  registerText: {
    color: colors.textMuted,
    fontSize: fontSize.sm,
  },

  link: {
    color: colors.primary,
    fontWeight: fontWeight.bold,
    marginLeft: spacing.xs,
  },
  forgotPassword: {
  alignSelf: 'flex-end',
  marginTop: -spacing.sm,
  marginBottom: spacing.lg,
  },
  
  forgotPasswordText: {
  color: colors.primary,
  fontSize: fontSize.sm,
  fontWeight: fontWeight.semibold,
  },

});