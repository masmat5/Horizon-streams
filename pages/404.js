import ErrorPage from '../components/ErrorPage';

export default function NotFound() {
  return <ErrorPage code="404" title="Page not found" text="The page you are looking for does not exist or has been moved. Try one of these instead." />;
}
