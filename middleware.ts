// "use server";
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    // startTransition(async () => {
    //     'use server';
    //     const user = await getCurrentUserAction();
    //     console.log(user);
    // });
    // const { user } = await getCurrentSession();
    //
    // // Check if the user is authenticated
    // if (!user) {
    //     return NextResponse.redirect('/sign_in');
    // }
    //
    // if (request.nextUrl.pathname.startsWith('/admin')) {
    //     if (user.role !== 'ADMIN') {
    //         return NextResponse.redirect('/');
    //     }
    // }
    //
    // if (request.nextUrl.pathname.startsWith('/dashboard')) {
    //     if (user.role !== 'DEALER' && user.role !== 'SELLER' ) {
    //         return NextResponse.redirect('/');
    //     } else if (user.status !== 'Approved') {
    //         return NextResponse.redirect('/');
    //     }
    // }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/dashboard/:path*'],
};