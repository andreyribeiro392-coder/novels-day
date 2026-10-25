# NOVELS.DAY

Site público mobile-first da plataforma NOVELS.DAY.

## Stack

- Next.js 15
- React 19
- TypeScript
- Supabase
- Vercel

## Conteúdo

O repositório não inclui novelas, episódios, usuários, pagamentos ou métricas fictícias. Tudo é carregado do Supabase.

## Variáveis de ambiente

Copie `.env.example` para `.env.local` e preencha:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Na Vercel, adicione as mesmas variáveis em **Project Settings > Environment Variables**.

## Desenvolvimento

```bash
npm install
npm run dev
```

## Publicação

Conecte este repositório à Vercel. O framework é detectado automaticamente como Next.js.

## Banco

Use o `schema.sql` do repositório `adm-novelsday` para criar as tabelas e políticas no Supabase.

## Regras atuais

- Somente novelas com `status = published` aparecem no site.
- Somente episódios com `status = published` aparecem.
- Episódios marcados como `free` abrem no player.
- Episódios marcados como `premium` permanecem bloqueados até a integração real de assinatura ser conectada.
- Se o banco estiver vazio, o site exibe estados vazios reais em vez de conteúdo inventado.
