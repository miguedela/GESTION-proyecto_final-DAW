import { useNavigate } from 'react-router-dom';
import { MainButton } from '../../components/Buttons';

export const NotFound = () => {
    const navigate = useNavigate();

    return <div className='min-h-screen flex flex-col gap-10 items-center justify-center bg-linear-to-br from-neutral-900  to-blue-950 text-neutral-100'>
        <div>
            <h1 className='text-5xl text-orange-300 text-center'>Página no encontrada</h1>
            <h2 className='text-3xl text-center text-orange-400 mt-5'>404</h2>
        </div>
        <MainButton onClick={() => navigate(-1)} text='Volver' />
    </div>
}
