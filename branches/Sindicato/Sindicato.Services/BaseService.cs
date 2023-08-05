using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Sindicato.Common.Data;
using Sindicato.Common.Data.Interfaces;
using Sindicato.Model;
namespace Sindicato.Services
{
    public class BaseService
    {
        public string conexion;
        public string msgError = "";
        public void ExecuteManager(Action<IUnitOfWork> coreMethod, Action postCommit = null)
        {
            var uow = new UnitOfWork<SindicatoContext>();
            try
            {
                uow.Start();
                coreMethod(uow);
                uow.End();
                if (postCommit != null) postCommit();
            }
            catch (Exception e)
            {
                msgError = e.Message;
                uow.Rollback();
            }

        }
    }
}