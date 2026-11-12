
import { StyleSheet } from 'react-native';
import {colors,spacing,radius,fontSize,fontWeight,} from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    flex: 1,
    padding: spacing.xxl,
    alignItems: 'center',
  },

  title: {
    alignSelf: 'flex-start',
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.xxxl + spacing.sm,
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarText: {
    color: colors.onPrimary,
    fontSize: 40,
    fontWeight: fontWeight.bold,
  },

  name: {
    fontSize: fontSize.xl + 2,
    fontWeight: fontWeight.bold,
    color: colors.text,
    marginTop: spacing.lg,
    marginBottom: spacing.xxxl + 3,
  },

  info: {
    width: '100%',
    backgroundColor: colors.surface,
    padding: spacing.lg + 2,
    borderRadius: radius.md,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },

  label: {
    fontSize: fontSize.sm,
    color: colors.textSubtle,
    marginBottom: spacing.sm - 2,
  },

  value: {
    fontSize: fontSize.md + 1,
    color: colors.text,
    fontWeight: fontWeight.semibold,
  },

  button: {
    width: '100%',
    backgroundColor: colors.primary,
    padding: spacing.lg,
    borderRadius: radius.md,
    alignItems: 'center',
    marginTop: spacing.xxl,
  },

  buttonText: {
    color: colors.onPrimary,
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
  },
});
