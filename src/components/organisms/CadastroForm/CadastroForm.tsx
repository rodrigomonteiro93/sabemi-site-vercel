'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import FormField, { SelectOption } from '@/components/molecules/FormField';
import Button from '@/components/atoms/Button';
import styles from './CadastroForm.module.css';

const schema = z
  .object({
    tipoCadastro:   z.enum(['corretora', 'agencia']),
    nome:           z.string().min(1, 'Obrigatório'),
    email:          z.string().email('E-mail inválido'),
    telefone:       z.string().min(1, 'Obrigatório'),
    cpf:            z.string().min(1, 'Obrigatório'),
    dataNascimento: z.string().min(1, 'Obrigatório'),
    senha:          z.string().min(6, 'Mínimo 6 caracteres'),
    confirmarSenha: z.string().min(1, 'Obrigatório'),
    cnpj:           z.string().min(1, 'Obrigatório'),
    nomeFantasia:   z.string().min(1, 'Obrigatório'),
    razaoSocial:    z.string().min(1, 'Obrigatório'),
    registroTipo:   z.string().min(1, 'Obrigatório'),
    cep:            z.string().min(1, 'Obrigatório'),
    endereco:       z.string().min(1, 'Obrigatório'),
    bairro:         z.string().min(1, 'Obrigatório'),
    estado:         z.string().min(2, 'Obrigatório'),
    cidade:         z.string().min(1, 'Obrigatório'),
    numero:         z.string().min(1, 'Obrigatório'),
    complemento:    z.string().optional(),
  })
  .refine((d) => d.senha === d.confirmarSenha, {
    message: 'Senhas não conferem',
    path: ['confirmarSenha'],
  });

type FormValues = z.infer<typeof schema>;

const TIPO_OPTIONS: SelectOption[] = [
  { value: 'corretora', label: 'Corretora' },
  { value: 'agencia',   label: 'Agência de Viagem' },
];

const ESTADOS_OPTIONS: SelectOption[] = [
  { value: '',   label: 'Selecione' },
  { value: 'AC', label: 'AC' }, { value: 'AL', label: 'AL' },
  { value: 'AM', label: 'AM' }, { value: 'AP', label: 'AP' },
  { value: 'BA', label: 'BA' }, { value: 'CE', label: 'CE' },
  { value: 'DF', label: 'DF' }, { value: 'ES', label: 'ES' },
  { value: 'GO', label: 'GO' }, { value: 'MA', label: 'MA' },
  { value: 'MG', label: 'MG' }, { value: 'MS', label: 'MS' },
  { value: 'MT', label: 'MT' }, { value: 'PA', label: 'PA' },
  { value: 'PB', label: 'PB' }, { value: 'PE', label: 'PE' },
  { value: 'PI', label: 'PI' }, { value: 'PR', label: 'PR' },
  { value: 'RJ', label: 'RJ' }, { value: 'RN', label: 'RN' },
  { value: 'RO', label: 'RO' }, { value: 'RR', label: 'RR' },
  { value: 'RS', label: 'RS' }, { value: 'SC', label: 'SC' },
  { value: 'SE', label: 'SE' }, { value: 'SP', label: 'SP' },
  { value: 'TO', label: 'TO' },
];

const CIDADE_OPTIONS: SelectOption[] = [{ value: '', label: 'Selecione' }];

export default function CadastroForm() {
  const router = useRouter();

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { tipoCadastro: 'corretora' },
  });

  const tipoCadastroValue = watch('tipoCadastro') as 'corretora' | 'agencia';
  const registroLabel = tipoCadastroValue === 'corretora' ? 'SUSEP *' : 'CADASTUR *';

  async function onSubmit() {
    await new Promise((r) => setTimeout(r, 800));
    router.push('/login');
  }

  return (
    <form
      className={styles.formWrap}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <div className={`${styles.formRow} ${styles.cols1}`}>
        <FormField
          label="Tipo Cadastro *"
          name="tipoCadastro"
          type="select"
          register={register}
          options={TIPO_OPTIONS}
          error={errors.tipoCadastro?.message}
          id="tipoCadastro"
        />
      </div>

      <div className={`${styles.formRow} ${styles.cols3}`}>
        <FormField
          label="Seu nome completo *"
          name="nome"
          register={register}
          placeholder="Seu nome completo"
          error={errors.nome?.message}
        />
        <FormField
          label="E-mail Login *"
          name="email"
          type="email"
          register={register}
          placeholder="email@sabemi.com.br"
          error={errors.email?.message}
        />
        <FormField
          label="Telefone *"
          name="telefone"
          type="tel"
          register={register}
          setValue={setValue}
          mask="telefone"
          placeholder="(99) 9999.9999"
          error={errors.telefone?.message}
        />
      </div>

      <div className={`${styles.formRow} ${styles.cols4}`}>
        <FormField
          label="CPF *"
          name="cpf"
          register={register}
          setValue={setValue}
          mask="cpf"
          placeholder="999.999.999-99"
          error={errors.cpf?.message}
        />
        <FormField
          label="Data de Nascimento *"
          name="dataNascimento"
          register={register}
          setValue={setValue}
          mask="data"
          placeholder="99/99/9999"
          error={errors.dataNascimento?.message}
        />
        <FormField
          label="Senha *"
          name="senha"
          type="password"
          register={register}
          showToggle
          id="pwd1"
          error={errors.senha?.message}
        />
        <FormField
          label="Confirmar Senha *"
          name="confirmarSenha"
          type="password"
          register={register}
          showToggle
          id="pwd2"
          error={errors.confirmarSenha?.message}
        />
      </div>

      <div className={`${styles.formRow} ${styles.cols4}`}>
        <FormField
          label="CNPJ *"
          name="cnpj"
          register={register}
          setValue={setValue}
          mask="cnpj"
          placeholder="99.999.999/9999-99"
          error={errors.cnpj?.message}
        />
        <FormField
          label="Nome Fantasia *"
          name="nomeFantasia"
          register={register}
          error={errors.nomeFantasia?.message}
        />
        <FormField
          label="Razão Social *"
          name="razaoSocial"
          register={register}
          error={errors.razaoSocial?.message}
        />
        <FormField
          label={registroLabel}
          name="registroTipo"
          register={register}
          error={errors.registroTipo?.message}
        />
      </div>

      <hr className={styles.formDivider} />

      <h2 className={styles.sectionTtl}>Dados de Endereço</h2>

      <div className={`${styles.formRow} ${styles.cep}`}>
        <FormField
          label="CEP *"
          name="cep"
          register={register}
          setValue={setValue}
          mask="cep"
          placeholder="00000-000"
          error={errors.cep?.message}
        />
        <FormField
          label="Endereço *"
          name="endereco"
          register={register}
          error={errors.endereco?.message}
        />
        <FormField
          label="Bairro *"
          name="bairro"
          register={register}
          error={errors.bairro?.message}
        />
      </div>

      <div className={`${styles.formRow} ${styles.local}`}>
        <FormField
          label="Estado *"
          name="estado"
          type="select"
          register={register}
          options={ESTADOS_OPTIONS}
          error={errors.estado?.message}
        />
        <FormField
          label="Cidade *"
          name="cidade"
          type="select"
          register={register}
          options={CIDADE_OPTIONS}
          error={errors.cidade?.message}
        />
        <FormField
          label="Número *"
          name="numero"
          register={register}
          error={errors.numero?.message}
        />
        <FormField
          label="Complemento"
          name="complemento"
          register={register}
          error={errors.complemento?.message}
        />
      </div>

      <div className={styles.submitWrap}>
        <Button variant="outline" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
        </Button>
      </div>

      <div className={styles.loginBack}>
        Já tem cadastro?{' '}
        <a href="/login">Fazer login</a>
      </div>
    </form>
  );
}
