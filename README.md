# NOVELS.DAY

Site público mobile-first da plataforma NOVELS.DAY.

## Stack

- Next.js 15
- React 19
- TypeScript
- Supabase Auth + PostgreSQL
- Vercel

## Conteúdo

O repositório não inclui novelas, episódios, usuários, pagamentos ou métricas fictícias. Tudo é carregado do Supabase.

## Variáveis de ambiente

Copie `.env.example` para `.env.local` e preencha:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_CHECKOUT_URL=
```

`NEXT_PUBLIC_CHECKOUT_URL` deve ser a URL real do seu checkout quando o gateway de pagamento estiver conectado. Se estiver vazia, o site não inventa uma compra.

Na Vercel, adicione as mesmas variáveis em **Project Settings > Environment Variables**.

## Desenvolvimento

```bash
npm install
npm run dev
```

## Publicação

Conecte este repositório à Vercel. O framework é detectado automaticamente como Next.js.

## Banco

No repositório `adm-novelsday`, execute no Supabase, nesta ordem:

1. `schema.sql`
2. `migrations/002_user_library.sql`

## Funcionalidades reais já preparadas

- catálogo somente com novelas publicadas;
- páginas individuais de novela;
- episódios grátis e Premium;
- login e criação de conta com Supabase Auth;
- Minha lista baseada em favoritos reais;
- gravação do progresso de reprodução para usuários autenticados;
- retomada do vídeo no ponto salvo;
- busca sobre o catálogo publicado;
- player real para URLs de vídeo cadastradas;
- episódios Premium verificam uma assinatura ativa na tabela `subscriptions` antes de reproduzir;
- página de assinatura preparada para receber uma URL de checkout real;
- estados vazios quando ainda não existe conteúdo.

## Regra Premium

O site não simula pagamento. O player Premium só libera quando existe uma linha válida em `subscriptions` para o usuário autenticado com `status = active` e período ainda válido. O gateway real deverá criar/atualizar essa informação por webhook em uma etapa posterior.
