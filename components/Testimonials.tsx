import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Testimonial {
  id: string;
  client: string;
  rating: number;
  message: string;
}

async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const q = query(collection(db, 'testimonials'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Testimonial[];
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
}

export default async function Testimonials() {
  const testimonials = await getTestimonials();

  const defaultTestimonials = [
    {
      id: '1',
      client: 'John Doe',
      rating: 5,
      message: 'Cleanest architecture I\'ve seen in years.',
    },
    {
      id: '2',
      client: 'Sarah Chen',
      rating: 5,
      message: 'Delivered ahead of schedule with exceptional code quality.',
    },
    {
      id: '3',
      client: 'Mike Johnson',
      rating: 5,
      message: 'Best developer I\'ve worked with. Period.',
    },
  ];

  const displayTestimonials = testimonials.length > 0 ? testimonials : defaultTestimonials;

  return (
    <section className="section-black py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-12">USER_REPORTS.txt</h2>

        <div className="space-y-6">
          {displayTestimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="border-2 border-brutalist-border p-6 bg-opacity-10 bg-brutalist-border"
            >
              <div className="flex justify-between items-start mb-4 flex-wrap gap-2">
                <span className="text-sm">Client: {testimonial.client}</span>
                <span className="text-brutalist-yellow">
                  {'★'.repeat(testimonial.rating)}
                </span>
              </div>
              <div className="italic text-sm">
                &quot;{testimonial.message}&quot;
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
