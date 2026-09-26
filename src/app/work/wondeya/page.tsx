import CaseStudyPage from '@/components/patterns/case-study-page';
import { getCaseStudyProject } from '@/content/portfolio';
import { getProjectMetadata } from '@/lib/metadata';

const project = getCaseStudyProject('wondeya');

export const metadata = getProjectMetadata(project);

const WondeyaCaseStudyPage = () => <CaseStudyPage project={project} />;

export default WondeyaCaseStudyPage;
