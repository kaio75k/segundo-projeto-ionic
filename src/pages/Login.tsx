import { useState, type FormEvent } from 'react';
import { IonButton, IonContent, IonIcon, IonInput, IonItem, IonPage } from '@ionic/react';
import { eyeOffOutline, eyeOutline } from 'ionicons/icons';

import './Login.css';

type LoginMode = 'login' | 'signup' | 'forgot-password' | 'forgot-email';

const Login: React.FC = () => {
	const [mode, setMode] = useState<LoginMode>('login');
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [notice, setNotice] = useState('');

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (mode === 'signup') {
			const formData = new FormData(event.currentTarget);
			if (formData.get('password') !== formData.get('confirmPassword')) {
				setNotice('As senhas não coincidem.');
				return;
			}
		}

		const messages: Record<LoginMode, string> = {
			login: 'A autenticação ainda não está conectada.',
			signup: 'O cadastro ainda não está conectado a um serviço.',
			'forgot-password': 'A recuperação de senha ainda não está conectada a um serviço.',
			'forgot-email': 'A recuperação de e-mail ainda não está conectada a um serviço.',
		};
		setNotice(messages[mode]);
	};

	const changeMode = (nextMode: LoginMode) => {
		setMode(nextMode);
		setNotice('');
		setPasswordVisible(false);
	};

	const titles: Record<LoginMode, string> = {
		login: 'Boas-vindas',
		signup: 'Criar conta',
		'forgot-password': 'Recuperar senha',
		'forgot-email': 'Recuperar e-mail',
	};

	const descriptions: Record<LoginMode, string> = {
		login: 'Entre com seus dados para continuar.',
		signup: 'Preencha seus dados para criar sua conta.',
		'forgot-password': 'Informe o e-mail associado à sua conta.',
		'forgot-email': 'Informe seu nome e telefone para localizar sua conta.',
	};

	const submitLabels: Record<LoginMode, string> = {
		login: 'Entrar',
		signup: 'Criar conta',
		'forgot-password': 'Recuperar senha',
		'forgot-email': 'Recuperar e-mail',
	};

	return (
		<IonPage>
			<IonContent fullscreen className="login-content">
				<main className="login-layout">
					<section className="login-panel" aria-labelledby="login-title">
						<p className="login-kicker">MEU APP</p>
						<h1 id="login-title">{titles[mode]}</h1>
						<p className="login-description">{descriptions[mode]}</p>

						<form className="login-form" onSubmit={handleSubmit}>
							{(mode === 'signup' || mode === 'forgot-email') && (
								<IonItem className="login-field" lines="none">
									<IonInput
										label="Nome completo"
										labelPlacement="stacked"
										name="name"
										autocomplete="name"
										placeholder="Seu nome"
										required
									/>
								</IonItem>
							)}

							{mode !== 'forgot-email' && (
								<IonItem className="login-field" lines="none">
									<IonInput
										label="E-mail"
										labelPlacement="stacked"
										name="email"
										type="email"
										autocomplete="email"
										placeholder="voce@exemplo.com"
										required
									/>
								</IonItem>
							)}

							{mode === 'forgot-email' && (
								<IonItem className="login-field" lines="none">
									<IonInput
										label="Telefone cadastrado"
										labelPlacement="stacked"
										name="phone"
										type="tel"
										autocomplete="tel"
										placeholder="(00) 00000-0000"
										required
									/>
								</IonItem>
							)}

							{(mode === 'login' || mode === 'signup') && (
								<IonItem className="login-field" lines="none">
									<IonInput
										label={mode === 'signup' ? 'Crie uma senha' : 'Senha'}
										labelPlacement="stacked"
										name="password"
										type={passwordVisible ? 'text' : 'password'}
										autocomplete={mode === 'signup' ? 'new-password' : 'current-password'}
										placeholder="Mínimo de 6 caracteres"
										required
										minlength={6}
									/>
									<IonButton
										className="password-toggle"
										type="button"
										fill="clear"
										aria-label={passwordVisible ? 'Ocultar senha' : 'Mostrar senha'}
										onClick={() => setPasswordVisible((visible) => !visible)}
									>
										<IonIcon slot="icon-only" icon={passwordVisible ? eyeOffOutline : eyeOutline} />
									</IonButton>
								</IonItem>
							)}

							{mode === 'signup' && (
								<IonItem className="login-field" lines="none">
									<IonInput
										label="Confirme a senha"
										labelPlacement="stacked"
										name="confirmPassword"
										type={passwordVisible ? 'text' : 'password'}
										autocomplete="new-password"
										placeholder="Digite a senha novamente"
										required
										minlength={6}
									/>
								</IonItem>
							)}

							<IonButton className="login-submit" type="submit" expand="block">
								{submitLabels[mode]}
							</IonButton>
							{notice && (
								<p className="login-notice" role="status">
									{notice}
								</p>
							)}
						</form>

						<nav className="login-links" aria-label="Opções da conta">
							{mode === 'login' && (
								<>
									<button type="button" className="login-link" onClick={() => changeMode('signup')}>
										Criar uma conta
									</button>
									<button type="button" className="login-link" onClick={() => changeMode('forgot-password')}>
										Esqueci minha senha
									</button>
									<button type="button" className="login-link" onClick={() => changeMode('forgot-email')}>
										Esqueci meu e-mail
									</button>
								</>
							)}
							{mode !== 'login' && (
								<button type="button" className="login-link" onClick={() => changeMode('login')}>
									Voltar para entrar
								</button>
							)}
						</nav>
					</section>
					<aside className="login-aside" aria-hidden="true">
						<span className="aside-mark">K</span>
						<p>Seu espaço,<br />do seu jeito.</p>
					</aside>
				</main>
			</IonContent>
		</IonPage>
	);
};

export default Login;
