export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);

  // Language negotiation applies only to the homepage. Product/legal URLs
  // must remain stable regardless of Cookie or Accept-Language headers.
  if (url.pathname !== '/' && url.pathname !== '/index.html') {
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
