
import { StyleSheet } from 'react-native';
import { colors, spacing, fontSize, fontWeight } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
    backgroundColor: colors.background,
  },

  logo: {
    fontSize: fontSize.display,
    fontWeight: fontWeight.bold,
    color: colors.primary,
    marginBottom: spacing.xl,
  },

  title: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.text,
    textAlign: 'center',
  },

  description: {
    fontSize: fontSize.md,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.md,
  },
});
