'use client';
import ZoomParallax from '../components/ZoomParallax/ZoomParallax';
import LineSweap from '../components/LineSweap';

export default function Photography() {
	return (
		<section className='bg-primary-vanilla w-full'>
			<LineSweap></LineSweap>
			<ZoomParallax></ZoomParallax>
		</section>
	);
}
