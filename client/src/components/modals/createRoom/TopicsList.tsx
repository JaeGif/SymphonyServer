import Topic from './Topic';
type TopicsListProps = {
  handleTopicSelection: Function;
};
function TopicsList({ handleTopicSelection }: TopicsListProps) {
  return (
    <div className='h-full overflow-scroll w-full'>
      <Topic
        handleTopicSelection={handleTopicSelection}
        title='Generic'
        icon={'/assets/favicons/Generic.png'}
      />
      <p className='text-gray-500 m-2'>COMMON TOPICS</p>
      <Topic
        handleTopicSelection={handleTopicSelection}
        title='Gaming'
        icon={'/assets/favicons/Gaming.png'}
      />
      <Topic
        handleTopicSelection={handleTopicSelection}
        title='Club'
        icon={'/assets/favicons/Club.png'}
      />
      <Topic
        handleTopicSelection={handleTopicSelection}
        title='Study'
        icon={'/assets/favicons/Study.png'}
      />
      <Topic
        handleTopicSelection={handleTopicSelection}
        title='Friends'
        icon={'/assets/favicons/Friends.png'}
      />
      <Topic
        handleTopicSelection={handleTopicSelection}
        title='Artists'
        icon={'/assets/favicons/Artists.png'}
      />
      <Topic
        handleTopicSelection={handleTopicSelection}
        title='Community'
        icon={'/assets/favicons/Community.png'}
      />
    </div>
  );
}

export default TopicsList;
