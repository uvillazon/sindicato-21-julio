using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Ninject;
using Ninject.Syntax;
using Sindicato.Services.Interfaces;
using Sindicato.Services;
using Sindicato.Model;

namespace Sindicato.WebSite.Infraestructura
{
    public class NinjectDependencyResolver : IDependencyResolver
    {
        private IKernel kernel;
        private string connectionString;

        public NinjectDependencyResolver(string connectionString = null)
        {
            kernel = new StandardKernel();
            this.connectionString = connectionString;
            AddBindings();
        }

        public object GetService(Type serviceType)
        {
            return kernel.TryGet(serviceType);
        }

        public IEnumerable<object> GetServices(Type serviceType)
        {
            return kernel.GetAll(serviceType);
        }

        public IBindingToSyntax<T> Bind<T>()
        {
            return kernel.Bind<T>();
        }

        public IKernel Kernel
        {
            get { return kernel; }
        }

        public string ConnectionString
        {
            set { connectionString = value; }
            get { return connectionString; }
        }


        private void AddBindings()
        {

            //var uow = new IUnitOfWork<SindicatoContext>();
            //Bind<ISD_LISTASManager>().To<SD_LISTASManager>().WithConstructorArgument("UnitOfWork", uow);
            //Bind<IRepositorioMN_LISTAS>().To<RepositorioMN_LISTAS>().WithConstructorArgument("connectionString", ConnectionString);
            Bind<IListasServices>().To<ListasServices>().WithConstructorArgument("conexion", "Conexxion q12312");
            Bind<IMenuOpcionesServices>().To<MenuOpcionesServices>();
            Bind<IUsuariosServices>().To<UsuariosServices>();
            Bind<ISociosServices>().To<SociosServices>();
            Bind<IChoforesServices>().To<ChoferesServices>();
            Bind<IFamiliaresServices>().To<FamiliaresServices>();
            Bind<IImagenesServices>().To<ImagenesServices>();
            Bind<IParametrosServices>().To<ParametrosServices>();
            Bind<IVentaHojasServices>().To<VentaHojasServices>();
            Bind<ICajasServices>().To<CajasServices>();
            Bind<IParadasServices>().To<ParadasServices>();
            Bind<IAutosServices>().To<AutosServices>();
            Bind<IOtrosServices>().To<OtrosServices>();
            Bind<ICierresServices>().To<CierresServices>();
            Bind<IDescuentosServices>().To<DescuentosServices>();
            Bind<ITrasferenciasServices>().To<TransferenciasServices>();
            //ITrasferenciasServices
            //Bind<IVentasDiariasServices>().To<VentasDiariasServices>();
            //Bind<IPosTurnosServices>().To<PosTurnosServices>();
            //Bind<ICajasServices>().To<CajasServices>();
            //Bind<IIngresosServices>().To<IngresosServices>();
            //Bind<IComprasServices>().To<ComprasServices>();
            //Bind<ICombustiblesServices>().To<CombustiblesServices>();
            //Bind<IClientesServices>().To<ClientesServices>();
            //Bind<IKardexEfectivoServices>().To<KardexEfectivoServices>();
            //Bind<IKardexClienteServices>().To<KardexClienteServices>();
            //Bind<IClientesConsumoServices>().To<ClientesConsumoServices>();
            //Bind<ITanquesServices>().To<TanquesServices>();

            //Bind<IMaterialesManagementService>().To<MaterialesManagementService>();
        }
    }
}