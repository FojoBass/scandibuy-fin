const SkeletonLoader = ({
  width,
  height,
}: {
  width: string;
  height: string;
}) => {
  return <div style={{ width, height }} className='skeleton_loader'></div>;
};

export default SkeletonLoader;
