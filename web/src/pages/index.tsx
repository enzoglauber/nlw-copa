import { GetStaticProps } from 'next';
import Image from 'next/image';
import { FormEvent, useState } from 'react';
import appPreviewImg from '../assets/app-nlw-copa-preview.png';
import iconCheckImg from '../assets/icon-check.svg';
import logoImg from '../assets/logo.svg';
import usersAvatarExampleImg from '../assets/users-avatar-example.png';
import { api } from '../lib/axios';

interface HomeProps {
  pool: number;
  guess: number;
  user: number;
}

export default function Home({pool, guess, user}: HomeProps) {
  const [poolTitle, setPoolTitle] = useState('')


  async function createPool(event: FormEvent) {
    event.preventDefault()

    try {
      const response = await api.post('/pools', {
        title: poolTitle
      })

      const {code} = response.data;
      navigator.clipboard.writeText(code);

      setPoolTitle('')
      alert('Bolão criado com sucesso o código foi copiado para a área de transferência!')
    } catch (error) {
      console.error(error)
      alert('Falha ao cadastrar o bolão, tente novamente!')
    }
  }

  return (
    <div className="max-w-[1124px] h-screen mx-auto grid grid-cols-2 gap-28 items-center">
      <main>
        <Image src={logoImg} alt="NLW COPA" width={213} height={41} quality={100} />

        <h1 className="mt-14 text-white text-5xl font-bold leading-tight">
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </h1>

        <div className="mt-10 flex items-center gap-2">
          <Image
            src={usersAvatarExampleImg}
            alt="Imagem de algumas pessoas que já usam o NLW Copa"
            width={158}
            height={57}
            quality={100}
          />

          <strong className="text-gray-100 text-xl">
            <span className="text-ignite-500">+{user}</span> pessoas já estão usando.
          </strong>
        </div>

        <form onSubmit={createPool} className="mt-10 flex gap-2">
          <input
            type="text"
            required
            placeholder="Qual nome do seu bolão?"
            className="flex-1 px-6 py-4 rounded bg-gray-800 border-gray-600 text-sm text-white"
            onChange={event => setPoolTitle(event?.target.value)}
            value={poolTitle}
          />

          <button
            type="submit"
            className="bg-yellow-500 px-6 py-4 rounded text-gray-900 font-bold text-sm uppercase hover:bg-yellow-700"
          >
            Criar meu bolão
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-300 leading-relaxed">
          Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀
        </p>

        <div className="mt-10 pt-10 border-t border-gray-600 flex items-center justify-between text-gray-100">
          <div className="flex items-center gap-6">
            <Image src={iconCheckImg} alt="Icone de check" width={40} height={40} quality={100} />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{pool}</span>
              <span>Bolões criados</span>
            </div>
          </div>

          <div className="w-px h-14 bg-gray-600" />

          <div className="flex items-center gap-6">
            <Image src={iconCheckImg} alt="Icone de check" width={40} height={40} quality={100} />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{guess}</span>
              <span>Palpites enviados</span>
            </div>
          </div>
        </div>
      </main>

      <Image
        src={appPreviewImg}
        alt="Dois celulares exibindo uma prévia da aplicção móvel do NLW Copa"
        width={518}
        height={605}
        quality={100}
      />
    </div>
  )
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  // const pool = await api('pools/count');
  // const guess = await api('guesses/count');
  const [pool, guess, user] = await Promise.all([
    api('pools/count'),
    api('guesses/count'),
    api('users/count'),
  ])

  return {
    props: {
      pool: pool.data.count,
      guess: guess.data.count,
      user: user.data.count,
    },
    revalidate: 10
  }
};