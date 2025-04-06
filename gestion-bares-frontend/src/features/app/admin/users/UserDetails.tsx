import { useAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { loadUser } from "../../../../api/users.api";
import { breadcrumbsAtom } from "../../../../atoms/breadcrumbs.atom";
import ConfirmModal from "../../../../components/ConfirmModal";
import { Loader } from "../../../../components/Loader";
import useUser from "../../../../hooks/useUser";
import { IUser } from "../../../../types/User";
import { formatDate } from "../../../../utils/dateUtils";

export const UserDetails = () => {
  const [, setBreadcrumbs] = useAtom(breadcrumbsAtom);

  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const { handleDeleteUser } = useUser();

  const handleLoadUser = useCallback(
    async () => {
      setLoading(true);

      try {
        const response = await loadUser(id!);
        if (response.status !== 200)
          navigate('/admin/users')

        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error loading user: ", error);
        setLoading(false);
      }
    }, [setUser, id, navigate]
  );

  useEffect(() => {
    if (!id)
      navigate("/admin/users")
    else
      handleLoadUser()
  }, [id, navigate, handleLoadUser]);

  useEffect(() => {
    setBreadcrumbs([
      { label: 'Usuarios', path: "/admin/users" },
      { label: 'Detalles de usuario', path: `/admin/users/${id}` },
    ]);
  }, [id, setBreadcrumbs])


  return <div className="">
    <Loader loading={loading}>
      <div>
        <h1 className="text-3xl mb-7">Detalles de usuario</h1>

        <div className="border-b border-neutral-400">
          <span className="text-xs text-neutral-400">Nombre</span>
          <p className="ml-2 mt-1">{user?.name}</p>
        </div>
        <div className="border-b border-neutral-400">
          <span className="text-xs text-neutral-400">Apellidos</span>
          <p className="ml-2 mt-1">{user?.surnames}</p>
        </div>
        <div className="border-b border-neutral-400">
          <span className="text-xs text-neutral-400">Email</span>
          <p className="ml-2 mt-1">{user?.email}</p>
        </div>
        <div className="border-b border-neutral-400">
          <span className="text-xs text-neutral-400">Teléfono</span>
          <p className="ml-2 mt-1">{user?.telephone}</p>
        </div>
        <div className="border-b border-neutral-400">
          <span className="text-xs text-neutral-400">Fecha de creación</span>
          <p className="ml-2 mt-1">{user?.creationDate && formatDate(user?.creationDate)}</p>
        </div>
        <div className="border-b border-neutral-400">
          <span className="text-xs text-neutral-400">Rol</span>
          <p className="ml-2 mt-1">{user?.role}</p>
        </div>

        <ConfirmModal
          isOpen={modalOpen}
          text={"Estás seguro de que quieres eliminar el usuario?"}
          type="negative"
          onConfirm={() => handleDeleteUser(id!)}
          onCancel={() => setModalOpen(false)}
        />
      </div>
    </Loader>
  </div>
}
