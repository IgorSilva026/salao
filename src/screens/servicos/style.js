
import { StyleSheet } from 'react-native';
import {colors,spacing,fontSize,fontWeight,radius,} from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },

  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xxxl,
  },

  title: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.xs,
  },

  subtitle: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
    marginBottom: spacing.xl,
  },

  form: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: radius.lg,
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
  },

  formTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: colors.text,
    marginBottom: spacing.lg,
  },

  label: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.label,
    marginBottom: spacing.xs,
  },

  input: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.md,
    fontSize: fontSize.md,
    color: colors.text,
    marginBottom: spacing.md,
  },

  textArea: {
    minHeight: 90,
    textAlignVertical: 'top',
  },

  button: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: radius.md,
    alignItems: 'center',
    marginTop: spacing.sm,
  },

  buttonText: {
    color: colors.onPrimary,
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
  },

  cancelButton: {
    alignItems: 'center',
    padding: spacing.md,
    marginTop: spacing.sm,
  },

  cancelText: {
    color: colors.textMuted,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
  },

  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: colors.text,
    marginBottom: spacing.md,
  },

  empty: {
    textAlign: 'center',
    color: colors.textMuted,
    padding: spacing.xl,
    fontSize: fontSize.sm,
  },

  card: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: radius.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },

  serviceName: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: colors.text,
    marginBottom: spacing.xs,
  },

  description: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
    marginBottom: spacing.xs,
  },

  duration: {
    color: colors.textMuted,
    marginTop: spacing.sm,
    fontSize: fontSize.sm,
  },

  price: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.primary,
    marginTop: spacing.md,
  },

  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.md,
  },

  editButton: {
    flex: 1,
    backgroundColor: colors.primary,
    padding: spacing.sm,
    borderRadius: radius.md,
    alignItems: 'center',
  },

  deleteButton: {
    flex: 1,
    backgroundColor: colors.danger,
    padding: spacing.sm,
    borderRadius: radius.md,
    alignItems: 'center',
  },

  actionText: {
    color: colors.onPrimary,
    fontWeight: fontWeight.semibold,
    fontSize: fontSize.sm,
  },
});
