export async function clearSession() {
    await browser.url('/');
    await browser.execute(() => {
        window.localStorage.clear();
        window.sessionStorage.clear();
    });
    await browser.deleteCookies();
}
