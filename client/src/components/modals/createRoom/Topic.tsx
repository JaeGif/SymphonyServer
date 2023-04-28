type TopicProps = {
  handleTopicSelection: Function;
  title: string;
  icon: string;
};
function Topic({ handleTopicSelection, title = 'Title', icon }: TopicProps) {
  return (
    <div
      onClick={() => {
        handleTopicSelection(title);
      }}
      className='border-[1px] border-gray-500 rounded-md flex justify-between items-center p-2 m-2 hover:bg-gray-200 cursor-pointer'
    >
      <img className='h-10' src={icon} alt='topic icon' />
      <p className='font-bold'>{title}</p>
      <img src='/assets/favicons/next.svg' alt='right chevron' />
    </div>
  );
}

export default Topic;
