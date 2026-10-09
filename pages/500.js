import ErrorPage from '../components/ErrorPage';

export default function ServerError() {
  return <ErrorPage code="500" title="Something went wrong" text="We hit a problem loading this page. Please try again in a minute, or message us on WhatsApp." />;
}
