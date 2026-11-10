import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('TransRomero ErrorBoundary caught:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md p-8 rounded-2xl bg-[#0D091A] border border-violet-800/80 shadow-[0_0_35px_rgba(219,39,119,0.3)]">
            <div className="w-12 h-12 rounded-full bg-fuchsia-950/70 border border-fuchsia-500/50 flex items-center justify-center mx-auto mb-4 text-fuchsia-400 font-bold text-xl">
              !
            </div>
            <h1 className="text-xl font-bold mb-2">TransRomero — Error de Càrrega</h1>
            <p className="text-xs text-zinc-400 mb-6 leading-relaxed">
              S'ha produït un error en renderitzar la pàgina. Fes clic a continuació per recarregar la sessió.
            </p>
            <button
              type="button"
              onClick={() => {
                window.location.hash = '#inicio';
                window.location.reload();
              }}
              className="px-6 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 rounded-lg hover:opacity-90 transition-opacity cursor-pointer shadow-[0_0_15px_rgba(219,39,119,0.3)]"
            >
              Recarregar Plataforma
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
