import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// Lazy components
const EditEventPage = lazy(() => import('./pages/EditEvent'));
const ErrorPage = lazy(() => import('./pages/Error'));
const EventDetailPage = lazy(() => import('./pages/EventDetail'));
const EventsPage = lazy(() => import('./pages/Events'));
const EventsRootLayout = lazy(() => import('./pages/EventsRoot'));
const HomePage = lazy(() => import('./pages/Home'));
const NewEventPage = lazy(() => import('./pages/NewEvent'));
const RootLayout = lazy(() => import('./pages/Root'));
const AuthenticationPage = lazy(() => import('./pages/Authentication'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    loader: () => import('./util/auth').then(module => module.loader()),
    id: 'root',
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'events',
        element: <EventsRootLayout />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: () => import('./pages/Events').then(module => module.loader()),
          },
          {
            path: ':eventId',
            id: 'event-detail',
            loader: ({ params }) => import('./pages/EventDetail').then(module => module.loader({ params })),
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: ({ request, params }) => import('./pages/EventDetail').then(module => module.action({ request, params })),
                loader: () => import('./util/auth').then(module => module.ISValidTokenLoader())
              },
              {
                path: 'edit',
                element: <EditEventPage />,
                action: ({ request, params }) => import('./components/EventForm').then(module => module.action({ request, params })),
                loader: () => import('./util/auth').then(module => module.ISValidTokenLoader())
              },
            ],
          },
          {
            path: 'new',
            element: <NewEventPage />,
            action: ({ request }) => import('./components/EventForm').then(module => module.action({ request })),
            loader: () => import('./util/auth').then(module => module.ISValidTokenLoader())
          },
        ],
      }, {
        path: 'auth',
        element: <AuthenticationPage />,
        action: ({ request }) => import('./pages/Authentication').then(module => module.action({ request }))
      }, {
        path: 'logout',
        action: () => import('./util/auth').then(module => module.removeToken())
      },
    ],
  },
]);

function App() {
  return (
    <Suspense fallback={<p style={{color:'green' , position : 'fixed' , top : '50%' , right : '50%' }}>Loading . . . </p>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
