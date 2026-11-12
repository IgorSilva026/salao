
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
    maxWidth: 650,
    width: '100%',
    alignSelf: 'center',
  },

  title: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.xs,
  },

  subtitle: {
    fontSize: fontSize.md,
    color: colors.textMuted,
    marginBottom: spacing.xl,
  },

  form: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.xl,
  },

  formTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.lg,
  },

  label: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    color: colors.label,
    marginBottom: spacing.sm,
  },

  input: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.md,
    fontSize: fontSize.md,
    color: colors.text,
    marginBottom: spacing.lg,
  },

  textArea: {
    minHeight: 90,
    textAlignVertical: 'top',
  },

  button: {
    backgroundColor: colors.primary,
    padding: spacing.lg,
    borderRadius: radius.md,
    alignItems: 'center',
  },

  buttonText: {
    color: colors.onPrimary,
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
  },

  cancelButton: {
    alignItems: 'center',
    padding: spacing.md,
    marginTop: spacing.sm,
  },

  cancelText: {
    color: colors.textMuted,
    fontWeight: fontWeight.semibold,
  },

  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.md,
  },

  empty: {
    color: colors.textMuted,
    textAlign: 'center',
    padding: spacing.xl,
  },

  card: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
  },

  productName: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.text,
  },

  description: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
    marginTop: spacing.sm,
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
    marginTop: spacing.lg,
  },

  editButton: {
    flex: 1,
    backgroundColor: colors.success,
    padding: spacing.md,
    borderRadius: radius.md,
    alignItems: 'center',
  },

  deleteButton: {
    flex: 1,
    backgroundColor: colors.danger,
    padding: spacing.md,
    borderRadius: radius.md,
    alignItems: 'center',
  },

  actionText: {
    color: '#FFFFFF',
    fontWeight: fontWeight.bold,
  },
});
