
import { StyleSheet } from 'react-native';
import { colors, spacing, radius, fontSize, fontWeight } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  conteudo: {
    padding: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  carregando: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  titulo: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  subtitulo: {
    fontSize: fontSize.md,
    color: colors.textMuted,
    marginBottom: spacing.xl,
  },
  vazio: {
    color: colors.textMuted,
    fontSize: fontSize.md,
    textAlign: 'center',
    marginTop: spacing.xl,
    marginBottom: spacing.xl,
  },
  cardAgendamento: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  nomeServico: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  info: {
    fontSize: fontSize.md,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  acoes: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  botaoConfirmar: {
    flex: 1,
    backgroundColor: colors.success,
    padding: spacing.md,
    borderRadius: radius.md,
    alignItems: 'center',
  },
  botaoCancelar: {
    flex: 1,
    backgroundColor: colors.danger,
    padding: spacing.md,
    borderRadius: radius.md,
    alignItems: 'center',
  },
  textoAcao: {
    color: colors.onPrimary,
    fontWeight: fontWeight.bold,
  },
  label: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.text,
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
  opcao: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.lg,
    marginBottom: spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selecionado: {
    borderColor: colors.borderSelected,
    backgroundColor: colors.primarySoft,
  },
  descricao: {
    color: colors.textSubtle,
    fontSize: fontSize.sm,
    marginTop: spacing.xs,
  },
  preco: {
    color: colors.primary,
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
  },
  botaoData: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.lg,
  },
  textoBotaoData: {
    color: colors.text,
    fontWeight: fontWeight.semibold,
  },
  gradeHorarios: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  horario: {
    width: '22%',
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  horarioSelecionado: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  textoHorario: {
    color: colors.label,
    fontWeight: fontWeight.semibold,
  },
  textoHorarioSelecionado: {
    color: colors.onPrimary,
  },
  botaoAgendar: {
    backgroundColor: colors.primary,
    padding: spacing.lg,
    borderRadius: radius.md,
    alignItems: 'center',
    marginTop: spacing.xxxl,
  },
  textoAgendar: {
    color: colors.onPrimary,
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
  },
  tituloMeus: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.text,
    marginTop: spacing.xxxl,
    marginBottom: spacing.lg,
  },
});
