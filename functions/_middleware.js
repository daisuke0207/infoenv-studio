export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);

  // 静的アセット・/en パスはスルー
  if (
    url.pathname.startsWith('/en') ||
    url.pathname.match(/\.(css|js|ico|png|jpg|svg|webp|woff2?)$/)
  ) {
    return next();
  }

  // Cookie で手動設定された言語を優先
  const cookies = request.headers.get('Cookie') || '';
  const langMatch = cookies.match(/(?:^|;\s*)lang=([^;]+)/);
  const savedLang = langMatch ? langMatch[1] : null;

  if (savedLang === 'en') {
    return Response.redirect(new URL('/en', request.url), 302);
  }
  if (savedLang === 'ja') {
    return next();
  }

  // Cookie なし → Accept-Language で自動判定
  const acceptLang = request.headers.get('Accept-Language') || '';
  const prefersJapanese = /^ja\b/i.test(acceptLang);

  if (!prefersJapanese) {
    return Response.redirect(new URL('/en', request.url), 302);
  }

  return next();
}
