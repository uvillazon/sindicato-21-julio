
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Sindicato.Common;
using Sindicato.Common.Data;
using Sindicato.Model;
using Sindicato.Common.Data.Interfaces;
using System.Data.Objects;

namespace Sindicato.Business
{
    public class SD_DEUDAS_SOCIOSManager : Repository<SD_DEUDAS_SOCIOS>
    {


        public SD_DEUDAS_SOCIOSManager(IUnitOfWork uow) : base(uow) { }

        //test

    }
}
